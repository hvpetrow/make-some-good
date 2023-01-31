
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { deleteCause } from '../../../services/causesService';
// import { useAuth } from '../../../contexts/AuthContext';

export const RemoveCause = async () => {
    // const navigate = useNavigate();
    // const { currentUser, decrementUserCauses } = useAuth();
    const { causeId } = useParams();

    // await decrementUserCauses(currentUser.uid);


    deleteCause(causeId)
        .then(() => {
            // navigate('/my-causes', { replace: true });
            toast.success('Successfully removed cause!');
        })
        .catch(() => {
            toast.error('Failed deleting');
            // navigate('/', { replace: true });
        });



    return null;
}
