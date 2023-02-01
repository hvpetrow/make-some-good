
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteCause } from '../../../services/causesService';
import { useAuth } from '../../../contexts/AuthContext';

export const RemoveCause = () => {
    const navigate = useNavigate();
    const { currentUser, decrementUserCauses } = useAuth();
    const { causeId } = useParams();

    deleteCause(causeId)
        .then(async () => {
            console.log();
            toast.success('Successfully removed cause!');
            await decrementUserCauses(currentUser.uid);
            navigate('/my-causes', { replace: true });
        })
        .catch(() => {
            toast.error('Failed deleting');
            navigate('/', { replace: true });
        });

    return null;
}
